<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestVoitureRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?true:false;//->can('someAbility');
       
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "nom"=>"required|min:3|max:255",            
            "annee_fabrication"=>"required|integer|min:0|max:9999",
            "immatriculation"=>"required|min:4|max:50",
            "nombre_place"=>"required|integer|min:0|max:999",
            "nombre_portes"=>"required|integer|min:0|max:999",
            "volume_coffre"=>"nullable|max:150",
            "description"=>"nullable|max:10000",
            "couleur"=>"nullable|max:50",
            "disponibilite"=>"required|in:0,1",
            "date_achat"=>"nullable|date_format:d/m/Y|max:50",
            "marque_id"=>"required|exists:marques,id",
            "type_carburant_id"=>"required|exists:type_carburants,id",
            "categorie_id"=>"required|exists:categories,id",
            "systeme_securites"=>"array",
            "systeme_securites.*"=>"nullable|exists:systeme_securites,id",
            "puissance_moteur"=>"nullable|max:250",
            "type_transmission"=>"nullable|max:250",
            "type_eclairage"=>"nullable|max:250",
            "nombre_vitesse"=>"required|integer|max:50",
            "type_suspenssion"=>"nullable|max:250",
            "capacite_reservoir"=>"nullable|max:250",
            "emission_co2"=>"nullable|max:250",
            "consommation"=>"nullable|max:250",
            "technologies_a_bord"=>"nullable|max:10000",
            'photo' => 'nullable|sometimes|mimes:jpeg,png,jpg,gif,webp|dimensions:min_width=50,min_height=50,max_width=2500,max_height=2500'
        ];
    }
}
