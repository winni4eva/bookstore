<?php

use Illuminate\Database\Eloquent\Model;

class Book extends Model {
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['category_id', 'title', 'price','sales_price','quantity','author','isbn','description'];

}
