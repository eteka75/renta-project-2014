<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestAvisClient extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'auteur' => 'required|max:250',
            'profession' => 'nullable|max:250',
            'actif' => 'nullable|in:1,0',
            'nombre_etoile' => 'required|integer|min:0|max:5|in:0,1,2,3,4,5',
            'message' => 'required|min:20|max:10000',
            'photo' => 'nullable|sometimes|mimes:jpeg,png,jpg,gif,webp
                    |dimensions:min_width=50,min_height=50,
                    max_width=2500,max_height=2500|max:2048'
        ];
    }
}
