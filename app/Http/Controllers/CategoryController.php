<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Requests\CategoryRequest;
use App\Category;
use Log;

class CategoryController extends Controller
{
                protected  $category;

                public function __construct(Category $category){
                            $this->category = $category;
                }
                /**
                 * Display a listing of the resource.
                 *
                 * @return \Illuminate\Http\Response
                 */
                public function index()
                {
                            try{

                                    $categories = $this->category->all();

                                    return response()->json( compact('categories'), 200);

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
                 * Store the incoming category post.
                 *
                 * @param  CategoryRequest  $request
                 * @return Response
                 */
                public function store(CategoryRequest $request)
                {
                            try {
                                        //updateOrCreate
                                        $this->category->create( $request->all() );

                                        return response()->json(['success' => 'Category added successfully...'], 200);

                            } catch (Exception $e) {
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
