<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            Schema::create('books', function(Blueprint $table){
                            $table->increments('id');
                            $table->integer('category_id')->unsigned();
                            $table->foreign('category_id', 'category_id_fk')
                                    ->references('id')
                                    ->on('categories')
                                    ->onDelete('cascade')
                                    ->onUpdate('cascade');
                            $table->string('title')->default('');
                            $table->decimal('price')->default(0.00);
                            $table->integer('quantity')->default(0);
                            $table->string('author')->default('');
                            $table->string('isbn')->default('');
                            $table->text('description')->default('');
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
                Schema::drop('books');
    }
}
