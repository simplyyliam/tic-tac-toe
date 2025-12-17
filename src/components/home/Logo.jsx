import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export default function Logo() {
  return (
    <Container>
      <svg width="40" height="40" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="35"
          stroke="#C4B5FD"
          strokeWidth="10"
          fill="none"
        />
      </svg>

      <svg width="40" height="40" viewBox="0 0 100 100">
        <path
          d="M25 25 L75 75"
          stroke="#8B5CF6"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M75 25 L25 75"
          stroke="#8B5CF6"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <svg width="40" height="40" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="35"
          stroke="#C4B5FD"
          strokeWidth="10"
          fill="none"
        />
      </svg>
    </Container>
  );
}