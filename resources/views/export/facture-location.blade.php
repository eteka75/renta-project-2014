@extends('layouts.default')

@section('content')
<div>

    <div class=" mx-auto shadow-sm border bg-white max-w-screen-lg p-8">

        <div class="mb-4 ">
            <table>
                <tr>
                    <td>
                        <div class="font-bold">RENTAL CAR SERVICES</div>
                        {!!  $entete->contenu !!}
        
                    </div>
                  
        
                    </td>
                    <td  width="10%">
                        @if ($entete != null && $entete->photo != null)
                        <img height="100px" class="rounded-full h-24 w-24 transform transition-all duration-300 mx-auto max-w-full object-cover object-center"
                            src="{{ asset($entete->photo) }}" alt="{{ $entete->photo }}" />
                    @endif
                    </td>
                </tr>
            </table>
               
        </div>
        <div class="p-2 mb-4 bg-gray-100 font-bold text-right_ text-2xl">FACTURE CLIENT N° {{ $num_facture }}</div>
        <div class="mb-8">
            <p><span class="font-bold">Client:</span> {{ $reservation->nom_complet }}</p>
            <p><span class="font-bold">Adresse:</span> {{ $reservation->adresse_residence }}
                {{ $reservation->ville_residence ? ', ' . $reservation->ville_residence : null }}</p>
            <p><span class="font-bold">Email:</span> {{ $reservation->email }}</p>
        </div>

        <table with="100%" border='1' class="w-full mb-4 border ">
            <thead>
                <tr class='border-b border-t'>
                    <th class="p-2 text-start">Opération</th>
                    <th class="p-2 text-right">Montant</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="p-2">
                        <div class="text-lg">Location de la voiture
                            <b>{{ $reservation->voiture ? $reservation->voiture->nom : '' }}</b></div>
                        <div class="mb-4 text-sm">
                            <p><span
                                    class="font-bold me-2">Immatriculation:</span><span>{{ $reservation->voiture ? $reservation->voiture->immatriculation : '' }}</span>
                            </p>
                            <p><span class="font-bold me-2">Début:</span>
                                {{ $reservation->date_debut ? $reservation->date_debut : '' }}</p>
                            <p><span class="font-bold me-2">Fin:</span>
                                {{ $reservation ? $reservation->date_fin : '' }}</p>
                        </div>
                    </td>
                    <td class="p-2 text-right ">{{ $reservation? $reservation->montant : '' }}</td>
                </tr>
                <tr>
                    <th class='text-start p-2'>TVA : </th>
                    <td class='p-2 text-right'>{{ $reservation ? $reservation->tva : '-' }}</td>
                </tr>
                <tr class='bg-gray-100 border-t border-b -b'>
                    <th class='text-start p-2 text-lg'>Montant payé (TVA incluse): </th>
                    <td class='px-2 text-right text-lg font-bold'>
                        {{ $transaction->montant ? $transaction->montant : '' }}</td>
                </tr>
            </tbody>
        </table>

        <div class="mt-8 ">
            Facture générée le {{ date('d/m/Y H\H:i:s', time()) }}
            <p class="mt-4 mb-4 font-bold">Merci de votre confiance!</p>

        </div>
    </div>
    </div>
    @endsection