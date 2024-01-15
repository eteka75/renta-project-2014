<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestIdentificationClient extends FormRequest
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
            'prenom' => 'required|min:2|max:255',
            'sexe' => 'required|in:M,F',
            'date_naissance' => 'required|date_format:d/m/Y',
            'lieu_naissance' => 'required|min:2|max:255',
            'pays_id' => 'required|exists:pays,id',
            'type_piece_identite' => "required|in:Carte d'itentité,Passport,Carte d'électeur",
            'numero_piece_identite' => 'required|min:2|max:150',
            'numero_permis' => 'nullable|max:150',
            'adresse_residence' => 'nullable|max:150',
            'ville_residence' => 'nullable|max:150',
            'date_expiration_permis' => 'nullable|date_format:d/m/Y',
            'nb_annee_conduite' => 'nullable|integer|min:0|max:100',
            'fichier_identite' => 'nullable|mimes:doc,docx,pdf,jpg,jpeg,png,gif|max:2048',
            'fichier_permis' => 'nullable|mimes:doc,docx,pdf,jpg,jpeg,png,gif|max:2048',
            'fichier_residence' => 'nullable|mimes:doc,docx,pdf,jpg,jpeg,png,gif|max:2048',
        ];
    }
}
