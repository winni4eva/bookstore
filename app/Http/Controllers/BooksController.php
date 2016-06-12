<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Requests\BookRequest;
use App\Book;
use App\BookImage;
use Log;
use DB;
use Image;

class BooksController extends Controller
{

            protected $book;

            protected $bookImage;

            public function __construct(Book $book, BookImage $bookImage){
                        $this->book = $book;
                        $this->bookImage = $bookImage;
            }
            /**
             * Display a listing of the resource.
             *
             * @return \Illuminate\Http\Response
             */
            public function index()
            {
                         try{

                                    $books = $this->book->with(['category','bookImage'])->get();

                                    return response()->json( compact('books'), 200);

                            } catch (Exception $e) {
                                    Log::error("Exception caught, filename: " . $e->getFile() . " on line: " . $e->getLine());
                                    Log::error($e->getMessage());
                                    return response()->json(['error' => 'Something unusual happened' ], 500);
                            }
            }

            /**
             * Store a newly created resource in storage.
             *
             * @param  \Illuminate\Http\BookRequest  $request
             * @return \Illuminate\Http\Response
             */
            public function store(BookRequest $request)
            {
                        try {

                                        DB::beginTransaction();

                                                try {

                                                            //Save book details
                                                             $book  = $this->book->updateOrCreate( ['id' => $request->get('id') ], $request->all() );

                                                            //Get saved book id
                                                            $bookId = $book->id;
                                                    
                                                } catch (Exception $e) {
                                                        DB::rollback();
                                                        Log::error("Exception caught, filename: " . $e->getFile() . " on line: " . $e->getLine());
                                                        Log::error($e->getMessage());
                                                        return response()->json(['error' => 'Book details save failed...'], 400);
                                                }

                                                try {

                                                            //Create book cover images directory
                                                            if( !file_exists(public_path().'/cover_images/book/'.$bookId) ) mkdir(public_path()."/cover_images/book/$bookId", 0777, true);

                                                            //File destibation folder
                                                            $destinationPath = public_path().'/cover_images/book/'.$bookId;

                                                            //Save Book Cover Image
                                                            $image = $request->file('image');

                                                            $img_path = $image->move($destinationPath, $image->getClientOriginalName());

                                                            //Resize cover image
                                                            Image::make( $img_path )->resize(200, 285)->save( $img_path );

                                                            //Save Book
                                                            $pdfBook = $request->file('book');

                                                            $pdfBook->move($destinationPath, $pdfBook->getClientOriginalName());
                                                    
                                                } catch (Exception $e) {
                                                            DB::rollback();
                                                            Log::error("Exception caught, filename: " . $e->getFile() . " on line: " . $e->getLine());
                                                            Log::error($e->getMessage());
                                                            return response()->json(['error' => $e->getMessage()], 400);
                                                }

                                                try {
                                                            //Save book image details
                                                            $this->bookImage->updateOrCreate( [ 'book_id' => $bookId ], [
                                                                                                                                                                            'book_id' => $bookId, 
                                                                                                                                                                            'image_path' => "cover_images/book/$bookId/".$image->getClientOriginalName(), 
                                                                                                                                                                            'book_name' => "cover_images/book/$bookId/".$pdfBook->getClientOriginalName()
                                                                                                                                                                    ] );
                                                    
                                                } catch (Exception $e) {
                                                            DB::rollback();
                                                            Log::error("Exception caught, filename: " . $e->getFile() . " on line: " . $e->getLine());
                                                            Log::error($e->getMessage());
                                                            return response()->json(['error' => 'Book image details save failed...'], 400);
                                                }

                                       DB::commit();

                                       $message = 'Book '. ( ( $request->get('id') > 0 ) ? 'edited' : 'added' ) . ' successfully...';

                                       return response()->json( ['success' =>  $message], 200);

                       } catch (Exception $e) {
                                    DB::rollback();
                                    Log::error("Exception caught, filename: " . $e->getFile() . " on line: " . $e->getLine());
                                    Log::error($e->getMessage());
                                    return response()->json(['error' => 'Something unusual happened' ], 500);
                        }
            }

            /**
             * Remove the specified resource from storage.
             *
             * @param  int  $id
             * @return \Illuminate\Http\Response
             */
            public function destroy($id)
            {
                            try{
                                    
                                    if( $bookImage = $this->bookImage->where('book_id', $id)->first() )  {
                                        if(file_exists($bookImage->image_path)) @unlink($bookImage->image_path);
                                        if(file_exists($bookImage->book_name)) @unlink($bookImage->book_name);

                                    }

                                    if( $this->book->where('id', $id)->delete() ) return response()->json(['success' => 'Book removed successfully...' ], 200);

                                    return response()->json(['error' => 'Book delete failed...'], 400);

                            }catch (Exception $e)
                            {
                                    Log::error("Exception caught, filename: " . $e->getFile() . " on line: " . $e->getLine());
                                    Log::error($e->getMessage());
                                    return response()->json(['error' => 'Something unusual happened' ], 500);
                            }
            }
}
