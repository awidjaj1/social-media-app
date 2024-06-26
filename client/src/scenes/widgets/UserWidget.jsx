import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({userId, picturePath}) => {
    const {palette} = useTheme();
    const navigate = useNavigate();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const token = useSelector((state) => state.token);
    const _id = useSelector((state) => state.user._id);
    const friendsList = useSelector((state) => state.user.friends);
    const [user, setUser] = useState(null);
    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });
        const data = await response.json();
        setUser(data);
    };

    // getUser is called on first render
    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // while getUser() hasn't finished we return null
    // when it does finish, there will be a re-render due to setUser (useEffect is not run again)
    // TODO: can return a loading component
    if (!user){
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends
    } = user;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            onClick={() => navigate(`/profile/${userId}`)}
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>{userId == _id? friendsList.length: friends.length} friends</Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>

                <Divider />
                {/* SECOND ROW */}
                <Box p="1rem 0">
                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                        <LocationOnOutlined fontSize="large" sx={{color: main}} />
                        <Typography color={medium}>{location}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                        <WorkOutlineOutlined fontSize="large" sx={{color: main}} />
                        <Typography color={medium}>{occupation}</Typography>
                    </Box>
                </Box>
                
                <Divider/>
                {/* THIRD ROW */}
                <Box p="1rem 0">
                    <FlexBetween mb="0.5rem">
                        <Typography color={medium}>Who's viewed your profile</Typography>
                        <Typography color={main} fontWeight="525">{viewedProfile}</Typography>
                    </FlexBetween>
                    <FlexBetween>
                        <Typography color={medium}>Impressions of your post</Typography>
                        <Typography color={main} fontWeight="525">{impressions}</Typography>
                    </FlexBetween>
                </Box>
                <Divider />
                {/* FOURTH ROW */}
                <Box p="1rem 0">
                    <Typography fontSize="1rem" color={main} fontWeight="550" mb="1rem">
                        Social Profiles
                    </Typography>
                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            <img src="../assets/twitter.png" alt="twitter" />
                            <Box>
                                <Typography color={main} fontWeight="550">
                                    Twitter
                                </Typography>
                                <Typography color={medium}>
                                    Social Network
                                </Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color: main}} />
                    </FlexBetween>

                    <FlexBetween gap="1rem">
                        <FlexBetween gap="1rem">
                            <img src="../assets/linkedin.png" alt="linkedin" />
                            <Box>
                                <Typography color={main} fontWeight="550">
                                    Linkedin
                                </Typography>
                                <Typography color={medium}>
                                    Network Platform
                                </Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color: main}} />
                    </FlexBetween>
                </Box>
        </WidgetWrapper>
    )
};

export default UserWidget;