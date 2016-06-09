<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSalesPriceToBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            Schema::table('books', function(Blueprint $table){
                     $table->decimal('sales_price')->after('price')->default(0.00);
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
            Schema::table('books', function(Blueprint $table){
                     $table->dropColumn('sales_price');
            });
    }
}
