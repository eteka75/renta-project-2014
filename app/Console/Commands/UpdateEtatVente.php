<?php

namespace App\Console\Commands;

use App\Models\EnLocation;
use App\Models\EnVente;
use Illuminate\Console\Command;

class UpdateEtatVente extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:etat-vente';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Mettre à jour la colonne état en fonction de la date de début et de fin';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = now();

        EnVente::where(function ($query) use ($now) {
            $query->whereDate('date_debut_vente', '<=', $now)
                  ->whereDate('date_fin_vente', '>=', $now)
                  ->where('en_vente', 0);
        })->update(['en_vente' => 1]);

        EnVente::where(function ($query) use ($now) {
            $query->whereDate('date_debut_vente', '>', $now)
                  ->orWhereDate('date_fin_vente', '<', $now)
                  ->where('en_vente', 0);
        })->update(['en_vente' => 0]);

        $this->info('Etats des locations mis à jour avec succès.');
    }
}
