"use client";
/* eslint-disable @next/next/no-img-element -- documented local film posters, static export */
import { useEffect, useRef, useState } from "react";
import { films } from "@/content/films";
import type { Language } from "@/content/home-copy";

export function ScreeningRoom({ language }: { language: Language }) {
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const player = useRef<HTMLVideoElement>(null);
  const playAttempt = useRef(0);
  const film = films[selected];
  const text = language === "zh" ? {
    label: "影像放映室", heading: "把系统，", emphasis: "拍成故事。", intro: "产品、对照与生成影像。三种把想法变得可见的方式。",
    play: "播放", select: "选择影片", error: "视频暂时无法加载。可重试，或单独打开文件。", retry: "重试播放", open: "单独打开视频", source: "来源与说明",
  } : {
    label: "Screening room", heading: "Systems,", emphasis: "with a pulse.", intro: "Product, comparison and generative image. Three ways of making an idea visible.",
    play: "Play", select: "Choose a film", error: "This video could not load. Try again, or open the file directly.", retry: "Retry playback", open: "Open video file", source: "Source & context",
  };

  useEffect(() => {
    if (!playing) return;
    player.current?.focus({ preventScroll: true });
  }, [playing]);

  const choose = (index: number) => {
    playAttempt.current += 1;
    player.current?.pause();
    setSelected(index);
    setPlaying(false);
    setFailed(false);
  };
  const start = () => { playAttempt.current += 1; setFailed(false); setPlaying(true); };
  const retry = () => {
    const video = player.current;
    if (!video) { start(); return; }
    const attempt = ++playAttempt.current;
    setFailed(false);
    video.focus({ preventScroll: true });
    video.load();
    void video.play().catch(() => {
      if (playAttempt.current === attempt && player.current === video && video.isConnected) setFailed(true);
    });
  };
  const onKey = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = ["ArrowRight", "ArrowDown"].includes(event.key) ? (index + 1) % films.length : ["ArrowLeft", "ArrowUp"].includes(event.key) ? (index + films.length - 1) % films.length : event.key === "Home" ? 0 : event.key === "End" ? films.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    choose(next);
    document.getElementById(`film-tab-${films[next].id}`)?.focus();
  };

  return <section id="films" className="v3-films" aria-labelledby="films-title">
    <div className="v2-frame">
      <div className="v3-films-head v2-reveal"><p className="v3-eyebrow">02 / {text.label}</p><h2 id="films-title">{text.heading}<br/><em>{text.emphasis}</em></h2><p>{text.intro}</p></div>
      <div className="v3-film-stage v2-reveal" data-film={film.id}>
        <div className="v3-film-meta"><span>{film.category[language]}</span><span>{film.duration} / {film.format.split(" / ")[0]}</span></div>
        <div className="v3-film-screen" id="film-panel" role="tabpanel" aria-labelledby={`film-tab-${film.id}`}>
          {!playing ? <>
            <img src={film.poster} alt={film.title[language]} loading="lazy" width="1600" height="900" />
            <button className="v3-film-play" type="button" onClick={start} aria-label={`${text.play} ${film.title[language]}`}><span aria-hidden="true">↗</span><span>{text.play}<small>{film.duration}</small></span></button>
          </> : <video key={film.id} ref={player} src={film.source} poster={film.poster} controls playsInline autoPlay preload="none" tabIndex={0} aria-label={`${film.category[language]} — ${film.title[language]}`} aria-describedby="film-boundary" onError={event => { if (event.currentTarget === player.current && event.currentTarget.error) setFailed(true); }} onEnded={() => player.current?.pause()} />}
          {failed && <div className="v3-film-error" role="alert"><p>{text.error}</p><button type="button" onClick={retry}>{text.retry}</button><a href={film.source} target="_blank" rel="noopener noreferrer">{text.open} ↗</a></div>}
        </div>
        <div className="v3-film-description"><h3>{film.title[language]}</h3><p>{film.description[language]}</p></div>
        <div className="v3-film-tabs" role="tablist" aria-label={text.select}>{films.map((item, index) => <button key={item.id} id={`film-tab-${item.id}`} type="button" role="tab" aria-selected={selected === index} aria-controls="film-panel" tabIndex={selected === index ? 0 : -1} onClick={() => choose(index)} onKeyDown={event => onKey(event, index)}><small>0{index + 1}</small><span>{item.category[language]}<strong>{item.duration}</strong></span><b aria-hidden="true">↗</b></button>)}</div>
        <details className="v3-film-context"><summary>{text.source}<span>{film.size}</span></summary><p id="film-boundary" className="v3-film-boundary">{film.boundary[language]}</p></details>
      </div>
    </div>
  </section>;
}
