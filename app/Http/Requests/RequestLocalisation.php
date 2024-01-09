<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestLocalisation extends FormRequest
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
            'nom' => 'required|min:2|max:255',
            'ville' => 'required|min:2|max:255',
            'commune' => 'nullable|min:0|max:255',
            'departement' => 'nullable|min:0|max:255',
            'adresse' => 'nullable|min:0|max:2000',
            'description' => 'required|min:10|max:2000000',
        ];
    }
}
