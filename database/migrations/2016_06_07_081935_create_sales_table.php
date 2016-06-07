<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            Schema::create('sales', function(Blueprint $table){
                        $table->increments('id');
                        $table->integer('book_id')->unsigned();
                        $table->foreign('book_id', 'sales_book_id_fk')
                                ->references('id')
                                ->on('books')
                                ->onDelete('cascade')
                                ->onUpdate('cascade');
                        $table->integer('quantity');
                        $table->decimal('cost');
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
            Schema::drop('sales');
    }
}
