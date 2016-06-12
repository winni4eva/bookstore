<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model {
            /**
             * The attributes that are mass assignable.
             *
             * @var array
             */
            protected $fillable = ['category_id', 'title', 'price','sales_price','quantity','author','isbn','description'];

            public function category(){

                    return $this->hasOne('App\Category','id','category_id');

            }

            public function bookImage(){

                    return $this->hasOne('App\BookImage','book_id','id');

            }

            public function setTitleAttribute($value){

                            $this->attributes['title'] = ucwords( strtolower( $value ) ); 

            }

             public function setAuthorAttribute($value){

                            $this->attributes['author'] = ucwords( strtolower( $value ) ); 

            }

            public function getPriceAttribute($value){

                            return (int)$value;
            
            }

            public function getSalesPriceAttribute($value){

                            return (int)$value;
            
            }

            public function getQuantityAttribute($value){

                            return (int)$value;
            
            }

}
