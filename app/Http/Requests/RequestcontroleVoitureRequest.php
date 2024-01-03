<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestcontroleVoitureRequest extends FormRequest
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
            'nom_controle' => 'required|min:3|max:250',
            'date_controle' => 'required|date_format:d/m/Y|max:50',
            'organisme_controle' => 'nullable|max:250',
            'kilometrage' => 'nullable|max:50',
            'description' => 'nullable|max:10000',
            'fichier' => 'nullable|sometimes|file|mimes:pdf,doc,docx,zip'
        ];
    }
}
