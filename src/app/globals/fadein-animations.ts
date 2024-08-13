import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
    transition(':enter', [
        style({ transform: 'translateY(2%)',opacity: 0  }),
        animate('500ms ease-in', style({ transform: 'translateY(0)',opacity:100  })),
      ]),
]);