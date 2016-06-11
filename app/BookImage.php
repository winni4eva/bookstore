<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class BookImage extends Model {
	    /**
	     * The attributes that are mass assignable.
	     *
	     * @var array
	     */
	    protected $fillable = ['book_id', 'image_path', 'book_name'];

	    public function book(){

                        return $this->belongsToOne('App\Book','id');

                }

}
