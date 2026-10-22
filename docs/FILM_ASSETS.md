# Film assets

These are web derivatives of three videos supplied by the user for this portfolio. Original source files remain unchanged outside the repository. Source filenames and SHA-256 values identify them without publishing private filesystem paths. No claim is made that every visual, song, voice, or production step is original, that model execution was independently verified, or that the model labels form a controlled benchmark.

## Sources and edits

| Source filename | Source SHA-256 | Web derivative and edit |
| --- | --- | --- |
| `cueparcel-v4-cinematic-take05.mp4` | `0717c8e4bd12297c163fdbdb5612fe6d82658e174a1fa89b5dd8837cef874251` | `public/films/cueparcel-cinematic.mp4`: the complete 201.734-second source, with video and audio streams copied and MP4 faststart applied. No visual reconstruction or timeline cut. |
| `qingming-GPT-left-DeepSeek-right-4k30.mp4` | `d976a02c574349c54755b3fb264fc300596e8f4ee4d241c6ea384d64e6eff141` | `public/films/qingming-comparison.mp4`: the complete side-by-side comparison, downscaled from 3840×2160 to 1920×1080 at 30 fps. Neither comparison panel is cropped. The 1,080,085,251-byte source is not included in this repository. |
| `echoes_of_the_singularity_sample.mp4` | `16faf90c303f4d21430e9bb5e2e92cb3ee9a066dfff37208ae66a1b9cad0d9d8` | `public/films/singularity-study.mp4`: a 48-second excerpt of source time **12.000–60.000 seconds**. The opening title segment contains an unverified festival-selection statement; that segment is excluded from the web derivative. The source remains unchanged. The Gemini end credit is retained. |

The CueParcel source is a prerecorded Chinese product demonstration with English UI text and Chinese burned captions. It is supplied demonstration material, not a new current-product/provider test. The comparison carries left `GPT` / right `DEEPSEEK` labels and Chinese lyrics; those labels describe the supplied presentation and do not independently prove model provenance or relative quality. The Singularity source carries `DIRECTED & SYNTHESIZED BY GEMINI` and a code-generation claim in its end card. These are observed source credits, not independently verified production facts. Music, image, voice, and other rights were not independently established by this media-processing task.

## Posters

Every poster is a single real source frame encoded as WebP quality 94 with aspect ratio preserved. No generated imagery, frame compositing, caption replacement, or enhancement was used. Crops omit the source's bottom narration/lyric captions. CueParcel's interface copy and the comparison's panel labels remain part of the source image.

| Poster | Source time | Crop before scaling | Output |
| --- | --- | --- | --- |
| `public/films/cueparcel-cinematic.webp` | 163.601 s | `1920×864` at `(0,0)`; actual `showModal()` demonstration and mascot | 1600×720; 69,286 bytes |
| `public/films/qingming-comparison.webp` | 17.903 s | `3400×960` at `(220,430)`; both comparison panels and labels | 1600×452; 224,116 bytes |
| `public/films/singularity-study.webp` | 39.000 s in the original / 27.000 s in the excerpt | `1280×440` at `(0,100)`; luminous black-hole visual without subtitles | 1280×440; 37,194 bytes; native width retained without upscaling |

Videos retain their original 16:9 composition. Display them with `object-fit: contain`; poster crops are separate presentation assets and do not alter the video frames.

## Processing commands

FFmpeg 6.0 with libx264 and libwebp was used. `$CUE_SOURCE`, `$QINGMING_SOURCE`, and `$SINGULARITY_SOURCE` refer to the external user-provided files identified above. `$QA_DIR` is a temporary directory outside the repository. Commands below use symbolic input paths so this public document contains no private local paths. Encodes were run sequentially, with four encoder threads for the two transcodes.

```powershell
ffmpeg -hide_banner -loglevel error -n -i "$CUE_SOURCE" -map 0:v:0 -map 0:a:0 -c copy -map_metadata -1 -movflags +faststart public/films/cueparcel-cinematic.mp4

ffmpeg -hide_banner -loglevel error -y -i "$QINGMING_SOURCE" -map 0:v:0 -vf "scale=1920:1080:flags=lanczos" -r 30 -c:v libx264 -preset slow -b:v 3000k -pass 1 -passlogfile "$QA_DIR/qingming-web-pass" -threads 4 -an -f null NUL
ffmpeg -hide_banner -loglevel error -n -i "$QINGMING_SOURCE" -map 0:v:0 -map 0:a:0 -vf "scale=1920:1080:flags=lanczos" -r 30 -c:v libx264 -preset slow -b:v 3000k -pass 2 -passlogfile "$QA_DIR/qingming-web-pass" -threads 4 -pix_fmt yuv420p -c:a aac -b:a 128k -map_metadata -1 -movflags +faststart public/films/qingming-comparison.mp4

ffmpeg -hide_banner -loglevel error -n -ss 12 -i "$SINGULARITY_SOURCE" -t 48 -map 0:v:0 -map 0:a:0 -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -threads 4 -c:a aac -b:a 192k -map_metadata -1 -movflags +faststart public/films/singularity-study.mp4

ffmpeg -hide_banner -loglevel error -n -ss 163.601 -i "$CUE_SOURCE" -frames:v 1 -vf "crop=1920:864:0:0,scale=1600:720:flags=lanczos" -c:v libwebp -quality 94 -compression_level 6 public/films/cueparcel-cinematic.webp
ffmpeg -hide_banner -loglevel error -n -ss 17.903 -i "$QINGMING_SOURCE" -frames:v 1 -vf "crop=3400:960:220:430,scale=1600:-2:flags=lanczos" -c:v libwebp -quality 94 -compression_level 6 public/films/qingming-comparison.webp
ffmpeg -hide_banner -loglevel error -n -ss 39 -i "$SINGULARITY_SOURCE" -frames:v 1 -vf "crop=1280:440:0:100" -c:v libwebp -quality 94 -compression_level 6 public/films/singularity-study.webp
```

## Verification record

Media processing and validation were performed locally on 2026-10-22. All three MP4s contain H.264 video in `yuv420p` and stereo AAC audio. There are no separate subtitle tracks; visible video captions are burned into the source. All videos preserve 16:9 composition.

| Web MP4 | Dimensions / frame rate | Duration | Actual bytes / MiB | Video / audio bitrate | Frames |
| --- | --- | --- | --- | --- | --- |
| `cueparcel-cinematic.mp4` | 1920×1080 / 30 fps | 201.734 s | 53,653,043 / 51.16753 | 1,921,154 / 197,991 bit/s | 6,052 |
| `qingming-comparison.mp4` | 1920×1080 / 30 fps | 188.934 s | 74,046,276 / 70.61603 | 2,998,635 / 128,020 bit/s | 5,668 |
| `singularity-study.mp4` | 1280×720 / 24 fps | 48.000 s | 17,694,534 / 16.87482 | 2,749,023 / 193,625 bit/s | 1,152 |

Every MP4 is strictly below 100 MiB. CueParcel is below its 65 MiB target and Qingming is below its 85 MiB target. Measurements use 1 MiB = 1,048,576 bytes.

| Output | SHA-256 |
| --- | --- |
| `public/films/cueparcel-cinematic.mp4` | `a6d8e704aee7b9609647a7d39e7fd1ba56a971db84e8d5bcad2c677438761ce7` |
| `public/films/qingming-comparison.mp4` | `72b2b8ec817bda69cb262ad8d243b98ae79c42bd5b331d6422873df743194037` |
| `public/films/singularity-study.mp4` | `9bf2e8412e867719f419d1cd8691139e0758a272dc0053b06c88177d2d26428e` |
| `public/films/cueparcel-cinematic.webp` | `0a45ad34bae773ca906c6eb15cc26987175d675efe2181a7a053b85f96ad7c88` |
| `public/films/qingming-comparison.webp` | `d77dbdf934ca30f9510cb52d701a0628acc686883a4e31aed3ea6cdd5d85e458` |
| `public/films/singularity-study.webp` | `1b1c3c1f74d036f232a4c287eeeb4b60359c3f96c3068d0d810afcff35565645` |

Each MP4 was fully decoded through both its video and audio streams with `-xerror`: all three commands exited **0**, with **zero bytes of error output**. This verifies decodability, not audio meaning or subjective quality. Poster dimensions and codecs were also confirmed with ffprobe.

```powershell
ffprobe -v error -show_format -show_streams -of json public/films/cueparcel-cinematic.mp4
ffprobe -v error -show_format -show_streams -of json public/films/qingming-comparison.mp4
ffprobe -v error -show_format -show_streams -of json public/films/singularity-study.mp4

ffmpeg -hide_banner -v error -xerror -threads 4 -i public/films/cueparcel-cinematic.mp4 -map 0:v:0 -map 0:a:0 -f null NUL
ffmpeg -hide_banner -v error -xerror -threads 4 -i public/films/qingming-comparison.mp4 -map 0:v:0 -map 0:a:0 -f null NUL
ffmpeg -hide_banner -v error -xerror -threads 4 -i public/films/singularity-study.mp4 -map 0:v:0 -map 0:a:0 -f null NUL
```

A top-level MP4 atom inspection confirmed `moov` before `mdat` in every output, rather than relying only on the encoding flag:

| MP4 | `moov` byte offset | `mdat` byte offset | Faststart |
| --- | --- | --- | --- |
| CueParcel | 32 | 214,735 | VERIFIED |
| Qingming | 32 | 204,971 | VERIFIED |
| Singularity | 32 | 38,075 | VERIFIED |

CueParcel's source and derivative were additionally compared using `ffmpeg -i INPUT -map 0:v:0 -map 0:a:0 -c copy -f streamhash -hash sha256 -`. Source and output match for both packet-data streams:

- Video: `9d0fcad18fc62c5ec78e7e57280784544bb05f08c00bbd0558f90eb3ddc58094`.
- Audio: `e04b8c3e794988719ff7ae5871023400af496441f08f62ab06b2993ae368f906`.

All three posters were visually reviewed. The Qingming derivative was inspected at 34.806, 68.612, and 153.128 seconds at its actual 1080p resolution: both panels remain visible, with their source text and code labels. Fine text is naturally smaller than the 4K master; this web derivative does not claim to preserve 4K detail. Singularity's retained source interval was reviewed in a one-second contact sheet; no festival wording appeared in these 48 samples. The actual derivative's first frame and 46-second frame were also inspected: the opening title is excluded and the Gemini credit remains visible. This is explicit visual sampling rather than a claim that every frame was OCR-scanned.

Audio-stream presence and full decodability are VERIFIED. Audio audition, narration/music identity, rights, independent model execution, and current product/provider behavior are NOT TESTED by this task. Browser integration, hosted CI, and publication are separate checks performed by the portfolio implementation task.
