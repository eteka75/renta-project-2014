<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestEnLocationRequest extends FormRequest
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
            'voiture_id' => 'required|exists:voitures,id',
            'point_retraits' => 'required|array',
            'point_retraits.*' => 'required|exists:point_retraits,id',
            'localisations.*' => 'required|exists:localisations,id',
            'tarif_location_heure' => 'required_without_all:tarif_location_journalier,
            tarif_location_hebdomadaire,tarif_location_mensuel|nullable|integer|min:0|max:9999999999',
            'tarif_location_journalier' => 'required_without_all:tarif_location_heure,            
            tarif_location_hebdomadaire,tarif_location_mensuel|nullable|integer|min:0|max:9999999999',
            'tarif_location_hebdomadaire' => 'required_without_all:tarif_location_heure,
            tarif_location_journalier,tarif_location_mensuel|nullable|integer|min:0|max:9999999999',
            'tarif_location_mensuel' => 'required_without_all:tarif_location_heure,
            tarif_location_journalier,tarif_location_hebdomadaire|nullable|integer|min:0|max:9999999999',
            'date_debut_location' => 'required|date_format:d/m/Y|max:50',
            'date_fin_location' => 'required|date_format:d/m/Y|
            after_or_equal:date_debut_location|max:50',            
            'photos.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'conditions' => 'required|min:5|max:1000000',
            'description' => 'nullable|max:100000',
        ];
    }
    public function messages()
    {
        return [
            'required_without_all' => 'Au moins l\'un des champs :attribute doit être renseigné.',
        ];
    }
}
