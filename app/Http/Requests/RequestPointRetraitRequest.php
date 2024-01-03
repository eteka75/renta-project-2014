<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestPointRetraitRequest extends FormRequest
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
            'lieu' => 'required|max:250',
            'ville' => 'required|max:250',
            'quartier' => 'nullable|max:250',
            'contacts' => 'nullable|max:250',
            'adresse' => 'required|min:2|max:250',
            'map_local' => 'nullable|max:10000',
            'description' => 'nullable|max:100000',
            'photo' => 'nullable|sometimes|mimes:jpeg,png,jpg,gif,webp
                    |dimensions:min_width=50,min_height=50,
                    max_width=2500,max_height=2500'
        ];
    }
}
