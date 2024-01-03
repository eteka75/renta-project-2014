<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestLocationReductionRequest extends FormRequest
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
            'nom' => 'required|min:3|max:255',
            'type_reduction' => 'required|in:Montant,Pourcentage',
            'description' => 'nullable|max:10000',
            'code_reduction' => 'required|min:3|max:30',
            'montant_min_reduction' => 'required|integer|min:0|max:999999999',
            'montant_max_reduction' => 'required|integer|min:0|max:999999999|gt:montant_min_reduction',
            "date_debut_reduction"=>"required|date_format:d/m/Y|max:50",
            "date_fin_reduction"=>"required|date_format:d/m/Y|after_or_equal:date_debut_reduction|max:50",
            'montant' => 'required_if:pourcentage,"0"|required_if:pourcentage,0|integer|max:999999',
            'pourcentage' => 'required_if:montant,"0"|required_if:montant,"0"|integer|max:50',
            'photo' => 'nullable|sometimes|mimes:jpeg,png,jpg,gif,webp
                    |dimensions:min_width=50,min_height=50,
                    max_width=2500,max_height=2500'
        ];
    }
}
