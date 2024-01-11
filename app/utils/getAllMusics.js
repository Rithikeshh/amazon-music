import axios from 'axios'
import getHeaderWithProjectId from './headerWithProjectId';

export default async function getAllMusic(
    setIsLoading, 
    setTrendingSongs,
    setTop20List,
    setRomantic,
    setHappySongs,
    setsadSongs,
    setSoulSoother
    ){

    const config = getHeaderWithProjectId();
    try {
        setIsLoading(true);
        const trendingSongs = await axios.get(
        `https://academics.newtonschool.co/api/v1/music/song?filter={"featured":"Trending songs"}&limit=12`,
        config
        );
        setTrendingSongs(trendingSongs.data.data)

        const top20OfTheWeek = await axios.get(
        `https://academics.newtonschool.co/api/v1/music/song?filter={"featured":"Top 20 of this week"}&limit=12`,
        config
        );
        setTop20List(top20OfTheWeek.data.data)

        const romanticSongs = await axios.get(
        `https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"romantic"}&limit=12`,
        config
        );
        setRomantic(romanticSongs.data.data)

        const happySongs = await axios.get(
        `https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"happy"}&limit=12`,
        config
        );
        setHappySongs(happySongs.data.data)

        const sadSongs = await axios.get(
        `https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"sad"}&limit=12`,
        config
        );
        setsadSongs(sadSongs.data.data)
                
        const soulSoother = await axios.get(
        `https://academics.newtonschool.co/api/v1/music/song?filter={"featured":"Soul soother"}&limit=12`,
        config
        );
        setSoulSoother(soulSoother.data.data)
        
    //   setMusicList(response.data.data);
        // console.log(trendingSongs.data.data);
        // console.log(happySongs.data.data);
        // console.log(sadSongs.data.data);
        // console.log(partySongs.data.data);
    } catch (err) {
      console.log("err: ", err);
      //
    } finally {
      setIsLoading(false);
    }
}