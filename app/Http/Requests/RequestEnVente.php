<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestEnVente extends FormRequest
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
            /**/
            'voiture_id' => 'required|exists:voitures,id',
            'point_retrait_id' => 'required|exists:point_retraits,id',
            'duree_garantie' => 'nullable|max:250',
            'kilometrage' => 'nullable|max:50',
            'delai_livraison' => 'nullable|max:250',
            "date_debut_vente"=>"required|date_format:d/m/Y|max:50",
            "date_fin_vente"=>"required|date_format:d/m/Y|max:50|gte:date_debut_vente",
            "prix_vente"=>"required|integer|min:0|max:9999999999",
            "prix_defaut"=>"nullable|integer|min:0|max:9999999999",
            'photos' => 'nullable|array',
            'options_vente' => 'nullable|array',
            'options_vente.*' => 'nullable|exists:option_ventes,id',
            'photos.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}
