// import React from 'react';
import styled from 'styled-components'
import voices from '../MockData/voices.json'

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  overflow-y: auto;
  background-color: black;
  padding: 1rem;
  color: #22c55e;
`

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const VoiceList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const VoiceItem = styled.li`
  border: 1px solid #22c55e;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #064e3b;
  }
`

const VoiceContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`

const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #22c55e;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`

const VoiceInfo = styled.div`
  flex: 1;
`

const VoiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
`

const VoiceName = styled.span`
  font-size: 1.125rem;
  font-weight: bold;
`

const AccentTag = styled.span`
  font-size: 0.75rem;
  background-color: #064e3b;
  color: #4ade80;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
`

const Description = styled.p`
  font-size: 0.875rem;
  color: #4ade80;
  margin-bottom: 0.5rem;
`

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`

const Tag = styled.span`
  font-size: 0.75rem;
  background-color: #064e3b;
  color: #4ade80;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
`

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Title>Voices</Title>
      <VoiceList>
        {voices.map((voice) => (
          <VoiceItem key={voice.voice_id}>
            <VoiceContent>
              <Avatar>{voice.name.charAt(0)}</Avatar>
              <VoiceInfo>
                <VoiceHeader>
                  <VoiceName>{voice.name}</VoiceName>
                  <AccentTag>{voice.labels.accent}</AccentTag>
                </VoiceHeader>
                <Description>{voice.labels.description}</Description>
                <TagContainer>
                  {Object.entries(voice.labels).map(
                    ([key, value]) =>
                      key !== 'accent' &&
                      key !== 'description' && <Tag key={key}>{value}</Tag>,
                  )}
                </TagContainer>
              </VoiceInfo>
            </VoiceContent>
          </VoiceItem>
        ))}
      </VoiceList>
    </SidebarContainer>
  )
}

export default Sidebar
