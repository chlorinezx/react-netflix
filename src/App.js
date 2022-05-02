import React, { useEffect, useState } from "react";
import './App.css';
import tmdb from "./tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/featuredMovie";
import Header from "./components/Header";

export default () => {

   const [movieList, setMovieList] = useState([]);
   const [FeaturedData, setFeaturedData] = useState(null);
   const [blackHeader, setBlackHeader] = useState(false);
 
   useEffect(()=>{
     const loadAll = async () => {
       let list = await tmdb.getlistaPrincipal();
       setMovieList(list);

       let originals = list.filter(i=>i.slug === 'originals');
       let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
       let chosen = originals[0].items.results[randomChosen];
       let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
       setFeaturedData(chosenInfo);
     }

     loadAll();
   }, []);

   useEffect(()=>{
     const scrollListener = () => {
       if(window.scrollY > 10) {
         setBlackHeader(true);
       } else{
         setBlackHeader(false);
       }
     }

     window.addEventListener('scroll', scrollListener);

     return () => {
       window.removeEventListener('scroll', scrollListener);
     }
   }, []);

   return (
     <div className="page">

       <Header black={blackHeader}/>

        {FeaturedData &&
            <FeaturedMovie item={FeaturedData} />
        }


        <section className="lists">
            {movieList.map((item, key)=>(
                <MovieRow key={key} title={item.title} items={item.items} />
            ))}
        </section>

        <footer>
            Desenvolvido por @llima_developer.<br/>
            DIREITOS DE IMAGENS PARA NETFLIX.<br/>
            TODOS OS DADOS USADOS: <a href="https://www.themoviedb.org/?language=pt-BR">THE MOVIEDB</a>
        </footer>

     </div>
   )
}