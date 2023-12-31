import { styled } from "styled-components/native";

interface IconButtonProps {
	$error?: boolean;
}

export const IconBox = styled.TouchableOpacity<IconButtonProps>`
  width: 45px;
  height: 45px;
  background-color: ${({ theme }) => theme.colors.box};
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px ${({ $error, theme }) =>
		$error ? theme.colors.error : "transparent"};
  margin-top: 2px;
`;

export const Head = styled.View`
  width: 100%;
  padding: 15px 16px;
  background-color: ${({ theme }) => theme.colors.card};
  border-bottom-color: ${({ theme }) => theme.colors.disabled};
  border-bottom-width: 1px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Body = styled.View`
  width: 100%;
  flex: 1;
  padding: 10px 16px;
`;

export const IconButton = styled.TouchableOpacity<IconButtonProps>`
  width: 45px;
  height: 45px;
  background-color: ${({ theme }) => theme.colors.box};
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px ${({ $error, theme }) =>
		$error ? theme.colors.error : "transparent"};
`;
