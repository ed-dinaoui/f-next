import { useState, useEffect } from "react";
import InfoCard from "../components/info";
import AddBtn, { DoAllBtn, Input } from "../components/form";

function Home() {
  var [media_d, set_media_d] = useState([]),
    c_URL;

  useEffect(() => {
    c_URL = window.location.href;
  }, []);

  return (
    <main>
      <div>
        <Input />
        <div>{media_d}</div>
      </div>
      <div>
        <AddBtn
          click={(call) => {
            let val = document.getElementById("input").value,
              v_l = val.length;

            if (v_l > 20) {
              let s = val.slice(8, v_l).split("/")[0],
                va = s.length <= 8 ? s.replace(".", "") : s.split(".")[1];
              if (va === "youtube") {
                call(true);
                fetch(c_URL + "api/server?WHAT=info&F=mp4&URL=" + val)
                  .then((res) => res.json())
                  .then((d) => {
                    d.media.forEach((ob) => {
                      set_media_d(
                        media_d.concat(
                          <InfoCard
                            p={ob}
                            click={(fni, inf, loa) => {
                              loa(true);
                              let f = fni.media_type === "mp3" ? "mp4" : "mp3";

                              fetch(c_URL + "api/server?WHAT=rm&ID=" + fni.id);
                              fetch(
                                `${c_URL}api/server?WHAT=info&F=${f}&URL=${fni.url}`
                              )
                                .then((res) => res.json())
                                .then((data) => {
                                  inf(data.nM);
                                  loa(false);
                                });
                            }}
                            close={(inf, is) => {
                              is(false);
                              fetch(c_URL + "api/server?WHAT=rm&ID=" + inf.id);
                            }}
                          />
                        )
                      );
                    });
                    call(false);
                  });
              } else {
                alert(
                  " Only youtube , " +
                  " if this a yt video url you better watch" +
                  " a tutorial on how to retrive a Valid one "
                );
              }
            } else {
              alert("Try again with a valid Url");
            }
          }}
        />
        <DoAllBtn />
      </div>
    </main>
  );
}

export default Home;
