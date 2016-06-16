<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model {
                /**
                 * The attributes that are mass assignable.
                 *
                 * @var array
                 */
                protected $fillable = ['book_id','quantity','cost'];

}
