<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestValidateAchatStep1 extends FormRequest
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
            'achats.*' => 'required|exists:en_ventes,id',
            'nom' => 'required|min:2|max:150',
            //'prix' => 'required|min:1',
            'prenom' => 'required|min:2|max:200',
             'date_naissance' => 'required|date_format:d/m/Y',
            'lieu_naissance' => 'required|min:2|max:255',
            'pays_id' => 'required|exists:pays,id',
            'type_piece_identite' => "required|in:Carte d'itentité,Passport,Carte d'électeur",
            'numero_piece_identite' => 'required|min:2|max:150',
            'adresse_residence' => 'nullable|max:150',
            'telephone' => ['nullable', 'regex:/^([0-9\s\-\+\(\)]*)$/', 'min:8','max:100'],
            'ville_residence' => 'nullable|max:150',
            'email' => "required|email|email:rfc,dns|max:200",
            'infos' => 'max:10000000',
            'accept' => "required|in:1",
        ];
    }
}
