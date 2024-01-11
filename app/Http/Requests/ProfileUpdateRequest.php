<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'telephone' => ['nullable', 'regex:/^([0-9\s\-\+\(\)]*)$/', 'min:8','max:100'],
            'photo' => ['nullable','sometimes','mimes:jpeg,png,jpg,gif','dimensions:min_width=100,min_height=100,
            max_width=1500,max_height=1500','max:2048'],
            //'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:10'
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
        ];
    }
}
