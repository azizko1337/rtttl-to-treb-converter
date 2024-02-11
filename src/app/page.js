"use client";
import { Theme, Grid, Box, Flex, Heading, TextArea } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import Image from "next/image";
import rtttlToTreb from "@/utils/rtttlToTreb";
import "@radix-ui/themes/styles.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

export default function Home() {
  const [rtttl, setRtttl] = useState(
    "Super Mario - Main Theme:d=4,o=5,b=125:a,8f.,16c,16d,16f,16p,f,16d,16c,16p,16f,16p,16f,16p,8c6,8a.,g,16c,a,8f.,16c,16d,16f,16p,f,16d,16c,16p,16f,16p,16a#,16a,16g,2f,16p,8a.,8f.,8c,8a.,f,16g#,16f,16c,16p,8g#.,2g,8a.,8f.,8c,8a.,f,16g#,16f,8c,2c6"
  );
  const [treb, setTreb] = useState("");

  const handleChange = (event) => {
    const rtttl = event.target.value;
    setRtttl(rtttl);
  };

  useEffect(() => {
    try {
      const treb = rtttlToTreb(rtttl);
      treb.name = treb.name.replaceAll(" ", "").slice(0, 8).toUpperCase();
      setTreb(treb);
    } catch (e) {
      setTreb("");
    }
  }, [rtttl, setTreb]);

  const download = () => {
    //download the treb.treb as file.trb
    const element = document.createElement("a");
    const file = new Blob([treb.treb], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${treb.name}.TRB`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <main>
      <Theme>
        <Box width="100%" mb="3">
          <Flex justify="center">
            <Heading>KONWERTER</Heading>
          </Flex>
        </Box>
        <Grid columns={{ initial: "1", md: "2" }} gap="3" width="100%">
          <Flex direction="column">
            <Flex align="center" justify="center" height="9">
              RTTTL
              <Image width="60" height="60" src="/cheems.png" />
            </Flex>
            <TextArea
              onChange={handleChange}
              placeholder="Tutaj daj rtttl"
              value={rtttl}
              rows="20"
            />
          </Flex>
          <Flex direction="column">
            <Flex height="9" align="center" justify="center">
              <AwesomeButton type="instagram" ripple={true} href="/PLAYER.EXE">
                .treb
              </AwesomeButton>
              <Image width="60" height="60" src="/strongdoge.png" />
            </Flex>
            <TextArea
              disabled
              placeholder="Tutaj dostaniesz .treb jak wszystko pujdzie git"
              value={treb.treb}
              rows="20"
            />
            <Flex height="9" align="center" justify="center">
              <AwesomeButton type="instagram" ripple={true} onPress={download}>
                Pobierz jako {treb.name}.TRB
              </AwesomeButton>
            </Flex>
          </Flex>
        </Grid>
      </Theme>
    </main>
  );
}
