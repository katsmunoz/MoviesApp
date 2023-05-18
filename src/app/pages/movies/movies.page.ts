import { Component, OnInit } from '@angular/core';
import { IonInfiniteScroll, IonInfiniteScrollContent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})

export class MoviesPage implements OnInit {
  movies: any[] = [];
  currentPage = 1;
  imageBaseUrl = environment.images;

  constructor(
    private movieService: MovieService, 
    private loadingCtrl: LoadingController
    ) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: IonInfiniteScroll) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe(
    (res) => {
      loading.dismiss();
      this.movies = [...this.movies, ...res.results];
      console.log(res);

      event?.complete();
    });
  }

  loadMore(event: IonInfiniteScroll) {
    this.currentPage++;
    this.loadMovies(event);
    event.complete();
  }
}
