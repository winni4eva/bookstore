<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            Schema::create('book_images', function(Blueprint $table){
                        $table->increments('id');
                        $table->integer('book_id')->unsigned();
                        $table->foreign('book_id', 'images_book_id_fk')
                                ->references('id')
                                ->on('books')
                                ->onDelete('cascade')
                                ->onUpdate('cascade');
                        $table->string('image_path')->default('');
                        $table->timestamps();
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
            Schema::drop('book_images');
    }
}
