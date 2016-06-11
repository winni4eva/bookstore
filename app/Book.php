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

}
