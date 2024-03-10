'use client'

import {
    Card,
    Image,
    ActionIcon,
    Group,
    Text,
    Avatar,
    Badge,
    useMantineTheme,
    rem,
    Flex,
} from '@mantine/core';
import { IconHeart, IconBookmark, IconShare } from '@tabler/icons-react';
import './style_follower.css';
import Link from "next/link";
import { relative } from 'path';

export default function ArticleCardFooter() {
    const theme = useMantineTheme();

    return (
        <main>
            <div className="wrapping">
                <Card withBorder padding="lg" radius="md" style={{ width: rem(300), height: rem(500) }} className="card">
                    <Card.Section mb="sm">
                        <Image
                            src="https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                            alt="Title message"
                            height={180}
                        />
                    </Card.Section>

                    <Badge w="fit-content" variant="light">
                        decorations
                    </Badge>

                    <Text fw={700} className="follower_title" mt="xs">
                        投稿の時のコメント
                    </Text>

                    <Group mt="lg">
                        <Avatar
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
                            radius="sm"
                        />
                        <div>
                            <Text fw={500}>Followerの名前</Text>
                            <Text fz="xs" c="dimmed">
                                posted 34 minutes ago　とかあったらかっこいい
                            </Text>
                        </div>
                    </Group>

                    <Card.Section className="footer">
                        <Group justify="space-between">
                            <Text fz="xs" c="dimmed">
                                733 friends liked this　とかあったらかっこいい
                            </Text>
                            <Group gap={0}>
                                <ActionIcon variant="subtle" color="gray">
                                    <IconHeart
                                        style={{ width: rem(20), height: rem(20) }}
                                        color={theme.colors.red[6]}
                                        stroke={1.5}
                                    />
                                </ActionIcon>
                                <ActionIcon variant="subtle" color="gray">
                                    <IconBookmark
                                        style={{ width: rem(20), height: rem(20) }}
                                        color={theme.colors.yellow[6]}
                                        stroke={1.5}
                                    />
                                </ActionIcon>
                                <ActionIcon variant="subtle" color="gray">
                                    <IconShare
                                        style={{ width: rem(20), height: rem(20) }}
                                        color={theme.colors.blue[6]}
                                        stroke={1.5}
                                    />
                                </ActionIcon>
                            </Group>
                        </Group>
                    </Card.Section>
                </Card>
            </div>
        </main>
    );
}