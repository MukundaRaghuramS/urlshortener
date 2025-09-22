import { Anchor, Button, Center, Stack, Text, TextInput } from '@mantine/core'
import React,{useState} from 'react'
import Service from "../../utils/http";
import{ QRCodeSVG }from 'qrcode.react'; 
const UrlShortener =()=>{
    const[originalUrl, setOriginalUrl]=useState('');
    const[customLink, setCustomLink]=useState('');
    const[title, setTitle]=useState('');
    const[expiry, setExpiry]=useState('');
    const[shortUrlData, setShortUrlData]=useState(null);
    const service = new Service();
    const getShortUrl=async()=>{
    const response=await service.post('s',{
            customUrl : customLink,
            originalUrl,
            expiresAt: expiry,
            title
        });
        console.log(response)
        setShortUrlData(response);
       }
        return(
        <Center style={{height:"90vh"}}>
            <Stack style={{ width: '40vw'}}>
                {!shortUrlData ? <>
                <Text size ='30px' align='center'>Short Your Url Here</Text>
                <TextInput
                    label="Original Url"
                    withAsterisk
                    onChange={(e)=> setOriginalUrl(e.target.value)}
                    value ={originalUrl}
                    radiuas={'md'}
                />
                <TextInput
                    label="Customize Your Url(Optional)"
                    onChange={(e)=> setCustomLink(e.target.value)}
                    value ={customLink}
                    radiuas={'md'}
                />
                <TextInput
                    label="Title(Optional)"
                    onChange={(e)=> setTitle(e.target.value)}
                    value ={title}
                    radiuas={'md'}
                />
                <TextInput
                    label="Date of Expiry (Optional)"
                    onChange={(e)=> setExpiry(e.target.value)}
                    value ={expiry}
                    type='date'
                    radiuas={'md'}
                />
                
                <Button 
                    variant='outline' 
                    disabled={!originalUrl}
                    onClick={getShortUrl}>
                        Generate and Shorten Url
                </Button>
                </>:
                <>
                <Anchor
                  href={`${service.getBaseURL()}/api/s/${shortUrlData?.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shortUrlData?.shortCode}
                </Anchor>
                <QRCodeSVG
                  value={`${service.getBaseURL()}/api/s/${shortUrlData?.shortCode}`}
                /> 
                </>
                }

                
            </Stack>
        </Center>
    )
}

export default UrlShortener;