<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Book;
use App\Sale;
use Log;
use DB;

class SalesController extends Controller
{

    protected $book;

    protected $sale;

    public function __construct(Book $book, Sale $sale){
            $this->book = $book;
            $this->sale = $sale;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
            try {

                            if($request->has('search')){
                                    $books = $this->book->with(['category','bookImage'])
                                                                        ->where('title','LIKE', '%'.$request->input('search').'%' )
                                                                        ->orWhere('author','LIKE', '%'.$request->input('search').'%' )
                                                                        //->where('author','LIKE', '%'.$request->input('search').'%' )
                                                                        ->where('quantity','>', 0 )
                                                                        ->get();

                                    return response()->json( compact('books'), 200);
                            }

            } catch (Exception $e) {
                    Log::error("Exception caught, filename: " . $e->getFile() . " on line: " . $e->getLine());
                    Log::error($e->getMessage());
                    return response()->json(['error' => 'Something unusual happened' ], 500);
            }
}

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
                        try {

                                        DB::beginTransaction();

                                        foreach ($request->all() as $post) {
                                                
                                                $book = $this->book->find( $post['book']['id'] );

                                                if($book->quantity > 0){

                                                        if($book->quantity >= $post['quantity']){


                                                                $this->sale->create( 
                                                                                                        [
                                                                                                                    'book_id' => $post['book']['id'], 
                                                                                                                    'quantity' => $post['quantity'], 
                                                                                                                    'cost' => ($post['price'] * $post['quantity'])  
                                                                                                        ] 
                                                                                                );

                                                                $book->quantity = $book->quantity - $post['quantity'];
                                                                $book->update();

                                                        }else{
                                                                    DB::rollback();
                                                                    $message = 'The products in stock for '.$book->title.' is less than the quantity you specified';
                                                                    return response()->json(['error' => $message], 400);
                                                        }
                                                }else{
                                                            DB::rollback();
                                                            $message = 'Stock is '.$book->quantity.' for '.$book->title.'. Please restock';
                                                            return response()->json(['error' => $message], 400);
                                                }

                                        }

                                        DB::commit();
                                        return response()->json(['success' => 'Sale recorded successfully...'], 200);

                            } catch (Exception $e) {
                                    DB::rollback();
                                    Log::error("Exception caught, filename: " . $e->getFile() . " on line: " . $e->getLine());
                                    Log::error($e->getMessage());
                                    return response()->json(['error' => 'Something unusual happened' ], 500);
                            }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
            //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
