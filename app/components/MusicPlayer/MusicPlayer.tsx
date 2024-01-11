import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import { createPortal } from "react-dom";
import { useMusic } from "@/app/providers/MusicProvider";


const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function MusicPlayerSlider({music, artists}:any) {
  const theme = useTheme();
  const [position, setPosition] = React.useState(0);
  const {paused, setPaused, duration, setDuration, audioRef} = useMusic()
  const [isVolumeBarHidden, setIsVolumeBarHidden] = React.useState(true)
  const [volume, setVolume] = React.useState(0)
  
  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value - minute * 60);
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
  const mainIconColor = theme.palette.mode !== "dark" ? "#fff" : "#000";
  const lightIconColor = theme.palette.mode !== "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  }
  const handlePlayAndPause = () => {
    
    if (!paused) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setPaused((prev:any)=>!prev)

  };
  return (
    <>
        {
            createPortal(
                <div className="fixed z-[10] bottom-[0] w-[100%] pb-3 bg-[rgba(0,0,0,.6)] backdrop-blur-[30px]">
                    <Box sx={{ width: "100%", marginTop: "-16px", position: "relative"}}>
                    <div className="absolute top-[-10px] w-[100%]">
                    <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingInline:"8px"
                    }}
                    >
                    <TinyText>{formatDuration(position)}</TinyText>
                    <TinyText>-{formatDuration(duration - position)}</TinyText>
                    </Box>
                    </div>
                    <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={position}
                    min={0}
                    step={0.1}
                    max={duration}
                    onChange={(_, value) => {
                        setPosition(value as number)
                        audioRef.current.currentTime = value
                    }}
                    onMouseDownCapture={()=>{
                        audioRef.current.pause()
                    }}
                    onMouseUpCapture={()=>{
                        if(!paused){
                            audioRef.current.play()
                        }
                    }}
                    
                    sx={{
                        color: theme.palette.mode !== "dark" ? "rgba(255,255,255,0.87)" : "rgba(0,0,0,0.87)",
                        height: 4,
                        "& .MuiSlider-thumb": {
                        width: 8,
                        height: 8,
                        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                        "&::before": {
                            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                        },
                        "&:hover, &.Mui-focusVisible": {
                            boxShadow: `0px 0px 0px 8px ${
                            theme.palette.mode === "dark"
                                ? "rgb(255 255 255 / 16%)"
                                : "rgb(0 0 0 / 16%)"
                            }`,
                        },
                        "&.Mui-active": {
                            width: 12,
                            height: 12,
                        },
                        },
                        "& .MuiSlider-rail": {
                        opacity: 0.28,
                        },
                        padding: 0,
                        margin:"0 2px"
                    }}
                    />
                {/* <Widget> */}
                    <Box sx={{ display: "flex", alignItems: "center", paddingInline: "12px" }}>
                        <div className="flex items-center grow-[10] basis-[250px] truncate">
                            <CoverImage sx={{
                                width: 60,
                                height: 60,
                            }}>
                                <img
                                alt={music.title}
                                src={music.thumbnail}
                                />
                            </CoverImage>
                            <Box sx={{ ml: 1.5, minWidth: 0, display:'flex', flexDirection:"column", overflow:"hidden"}}>
                                <Typography
                                variant="caption"
                                color="rgba(255,255,255,0.6)"
                                fontWeight={500}
                                title={artists}
                                className="truncate"
                                >
                                {artists}
                                </Typography>
                                <Typography className="truncate" title={music.title}>
                                <b>{music.title}</b>
                                </Typography>
                            </Box>
                    </div>
                    <div className="flex justify-center grow items-center ">
                        <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexGrow: "1"
                        }}
                        >
                        <IconButton
                            aria-label={paused ? "play" : "pause"}
                            onClick={handlePlayAndPause}
                        >
                            {paused ? (
                            <PlayArrowRounded
                                sx={{ fontSize: "3rem" }}
                                htmlColor={mainIconColor}
                            />
                            ) : (
                            <PauseRounded
                                sx={{ fontSize: "3rem" }}
                                htmlColor={mainIconColor}
                            />
                            )}
                        </IconButton>
                        </Box>
                    </div>
                    <div className="flex justify-end grow-[10] basis-[250px]">
                        <button 
                            className="relative p-4"
                            onMouseOver={()=>setIsVolumeBarHidden(false)}
                            onMouseOut={()=>setIsVolumeBarHidden(true)}
                        > 
                            <VolumeUpRounded sx={{
                                width: 30,
                                height: 30,
                            }} htmlColor={lightIconColor} />
                            {!isVolumeBarHidden && 
                            <Box 
                                sx={{ 
                                    height: 70,
                                    position: "absolute",
                                    top: "calc(-100%)"
                                }}
                            >
                                <Slider
                                    sx={{
                                    '& input[type="range"]': {
                                        WebkitAppearance: 'slider-vertical',
                                    },
                                    color: "#fff"
                                    }}
                                    orientation="vertical"
                                    value={volume}
                                    aria-label="Temperature"
                                    valueLabelDisplay="auto"
                                    onKeyDown={preventHorizontalKeyboardNavigation}
                                    onChange={(e:any)=>{
                                        audioRef.current.volume = e.target?.value/100
                                        setVolume(e.target.value)
                                    }}
                                />
                            </Box>}
                        </button>
                    </div>
                    </Box>
                        
                    </Box>
                    <div>
                        <audio 
                            src={music.audio_url}
                            ref={audioRef}
                            onDurationChange={()=> {
                                setDuration((prev:any)=>{
                                    return audioRef.current ? Math.floor(audioRef.current.duration) : '0'
                                })
                                setVolume(audioRef.current.volume*100)
                            }}
                            onTimeUpdate={(e:any)=>{setPosition((e.target.currentTime))}}
                            onEnded={()=>setPaused(true)}
                        />
                    </div>
                </div>,
                document.body
            )
        }
    </>
  );
}
