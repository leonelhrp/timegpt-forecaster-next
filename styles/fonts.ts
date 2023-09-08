import localFont from 'next/font/local'

const nunito = localFont({
  src: [
    {
      path: '../public/fonts/Nunito-Variable.ttf',
      weight: '400'
    },
  ],
  variable: '--font-nunito'
})

export { nunito }