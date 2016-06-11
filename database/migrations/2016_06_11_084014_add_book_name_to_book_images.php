<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBookNameToBookImages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
                Schema::table('book_images', function(Blueprint $table){
                     $table->string('book_name')->after('image_path')->default('');
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
            Schema::table('book_images', function(Blueprint $table){
                     $table->dropColumn('book_name');
            });
    }
}
