<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestOperationVoitureRequest extends FormRequest
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
            'nom_operation' => 'required|min:3|max:250',
            'date_operation' => 'required|date_format:d/m/Y|max:50',
            'responsable_operation' => 'required|max:250',
            'kilometrage' => 'nullable|max:50',
            'prix_operation' => 'nullable|max:50',
            'description' => 'nullable|max:10000',
            'fichier' => 'nullable|sometimes|file|mimes:pdf,doc,docx,zip'
        ];
    }
}
