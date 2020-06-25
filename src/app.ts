import { loadingService } from './loading-service';

const loadingOverlay = document.getElementById('loading-overlay');

loadingService.loadingStatus$.subscribe(isLoading => {
  if (isLoading) {
    loadingOverlay.classList.add('open');
  } else {
    loadingOverlay.classList.remove('open');
  }
});

loadingService.showLoading();

setTimeout(() => loadingService.hideLoading(), 1500);
