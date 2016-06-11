<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model {
                /**
                 * The attributes that are mass assignable.
                 *
                 * @var array
                 */
                protected $fillable = ['name'];

                public function book(){

                        return $this->belongsToOne('App\Book', 'category_id');

                }

                public function setNameAttribute($value){

                            $this->attributes['name'] = ucfirst( strtolower( $value ) ); 

                }

}
