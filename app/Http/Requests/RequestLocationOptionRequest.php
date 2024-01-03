<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestLocationOptionRequest extends FormRequest
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
            'tarif_option_heure' => 'required_without_all:tarif_option_journalier,
            tarif_option_hebdomadaire,tarif_option_mensuel|nullable|integer|min:0|max:9999999999',
            'tarif_option_journalier' => 'required_without_all:tarif_option_heure,            
            tarif_option_hebdomadaire,tarif_option_mensuel|nullable|integer|min:0|max:9999999999',
            'tarif_option_hebdomadaire' => 'required_without_all:tarif_option_heure,
            tarif_option_journalier,tarif_option_mensuel|nullable|integer|min:0|max:9999999999',
            'tarif_option_mensuel' => 'required_without_all:tarif_option_heure,
            tarif_option_journalier,tarif_option_hebdomadaire|nullable|integer|min:0|max:9999999999',            
            'description' => 'required|min:10|max:100000',
            'photo' => 'nullable|sometimes|mimes:jpeg,png,jpg,gif,webp
                    |dimensions:min_width=100,min_height=100,
                    max_width=2500,max_height=2500|max:2048',

        ];
    }
}
