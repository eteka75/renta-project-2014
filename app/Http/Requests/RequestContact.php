<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestContact extends FormRequest
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
            'nom_prenom' => 'required|max:250',
            'telephone' => 'nullable|max:100',
            'objet' => 'required|max:250',
            'email' => 'nullable|email:rfc,dns|max:100',
            'actif' => 'nullable|in:1,0',
            'message' => 'required|min:10|max:10000'
        ];
    }
}
