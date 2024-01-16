<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules;
use Illuminate\Foundation\Http\FormRequest;

class ResquestUserEdit extends FormRequest
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
            'nom' => 'required|string|max:150',
            'prenom' => 'required|string|max:200',
            'role' => 'required|in:CL,ADMIN',
            'telephone' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:8|max:100',
            'password'=>['nullable', 'confirmed', 'string', 'min:8', 'max:50', Rules\Password::defaults()],
            'photo' => 'nullable|sometimes|mimes:jpeg,png,jpg,gif,webp
                    |dimensions:min_width=50,min_height=50,
                    max_width=1500,max_height=1500',
            'email' => 'required|string|email|max:255',//|unique:users
        
        ];
    }
}
