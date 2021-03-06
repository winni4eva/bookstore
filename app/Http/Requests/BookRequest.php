<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class BookRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
                        'title' => 'required',
                        'category_id' => 'required',
                        'price' => 'required',
                        'sales_price' => 'required',
                        'quantity' => 'required',
                        'author' => 'required',
                        'isbn' => '',
                        'description' => '',
                        'image' => 'required|image|mimes:jpeg,png|max:5000',
                        'book' => 'required|mimes:pdf|max:10000'
        ];
    }
}
