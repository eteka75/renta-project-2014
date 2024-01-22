<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestCommandeStep1 extends FormRequest
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
            'location_id' => 'required|exists:en_locations,id',
            'nom_complet' => 'required|min:2|max:255',
            'date_debut' => 'required|date_format:Y-m-d H:i',
            'date_fin' => 'required|date_format:Y-m-d H:i',
            'point_retrait_id' => 'required|exists:point_retraits,id',
            'date_naissance' => 'required|date_format:d/m/Y',
            'lieu_naissance' => 'required|min:2|max:255',
            'pays_id' => 'required|exists:pays,id',
            'type_piece_identite' => "required|in:Carte d'itentité,Passport,Carte d'électeur",
            'numero_piece_identite' => 'required|min:2|max:150',
            'numero_permis' => 'nullable|max:150',
            'adresse_residence' => 'nullable|max:150',
            'telephone' => ['nullable', 'regex:/^([0-9\s\-\+\(\)]*)$/', 'min:8','max:100'],
            'ville_residence' => 'nullable|max:150',
            'date_expiration_permis' => 'nullable|date_format:d/m/Y',
            'nb_annee_conduite' => 'nullable|integer|min:0|max:100',
            'email' => "required|email|email:rfc,dns|max:200",
            'accept' => "required|in:1",
        ];
    }
}
