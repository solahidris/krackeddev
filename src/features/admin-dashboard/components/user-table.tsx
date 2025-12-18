'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Profile } from '@/types/database';
import { toggleUserBan } from '../actions';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, ShieldAlert, ShieldCheck, Mail, MapPin, Code } from 'lucide-react';

interface UserTableProps {
    users: Profile[];
}

export function UserTable({ users }: UserTableProps) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [userToBan, setUserToBan] = useState<Profile | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleToggleBan = async (user: Profile) => {
        // If banning (currently active), show confirmation
        if (user.status !== 'banned') {
            setUserToBan(user);
            setDialogOpen(true);
            return;
        }

        // If unbanning, proceed directly (or could also ask confirm, but ban is the critical one)
        executeToggle(user);
    };

    const confirmBan = async () => {
        if (userToBan) {
            await executeToggle(userToBan);
            setDialogOpen(false);
            setUserToBan(null);
        }
    };

    const executeToggle = async (user: Profile) => {
        setLoadingId(user.id);
        const result = await toggleUserBan(user.id, user.status || 'active'); // Default to active if null

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success(
                `User ${user.username || 'unknown'} has been ${user.status === 'banned' ? 'unbanned' : 'banned'
                }.`
            );
            router.refresh();
        }
        setLoadingId(null);
    };

    const renderStatus = (status: string | undefined) => {
        const isBanned = status === 'banned';
        return (
            <Badge variant={isBanned ? 'destructive' : 'secondary'} className={isBanned ? 'bg-red-900/50 text-red-200 hover:bg-red-900/70' : 'bg-emerald-900/30 text-emerald-300'}>
                {isBanned ? 'BANNED' : 'ACTIVE'}
            </Badge>
        );
    };

    const renderAction = (user: Profile) => {
        const isBanned = user.status === 'banned';
        const isLoading = loadingId === user.id;

        return (
            <Button
                variant={isBanned ? 'outline' : 'destructive'}
                size="sm"
                onClick={() => handleToggleBan(user)}
                disabled={isLoading}
                className={isBanned ? 'border-emerald-500 text-emerald-500 hover:bg-emerald-950' : ''}
            >
                {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : isBanned ? (
                    <>
                        <ShieldCheck className="mr-2 h-4 w-4" /> Unban
                    </>
                ) : (
                    <>
                        <ShieldAlert className="mr-2 h-4 w-4" /> Ban User
                    </>
                )}
            </Button>
        );
    };

    return (
        <>
            {/* Desktop Table View */}
            <div className="hidden md:block rounded-md border border-gray-800 bg-gray-900/50">
                <Table>
                    <TableHeader>
                        <TableRow className="border-gray-800 hover:bg-transparent">
                            <TableHead className="text-gray-400">User</TableHead>
                            <TableHead className="text-gray-400">Role</TableHead>
                            <TableHead className="text-gray-400">Level</TableHead>
                            <TableHead className="text-gray-400">Status</TableHead>
                            <TableHead className="text-right text-gray-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                className={`border-gray-800 transition-colors ${user.status === 'banned' ? 'bg-red-950/10 hover:bg-red-950/20' : 'hover:bg-gray-800/50'}`}
                            >
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9 border border-gray-700">
                                            <AvatarImage src={user.avatar_url || ''} />
                                            <AvatarFallback>{(user.username || 'U')[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-200">{user.full_name || 'No Name'}</span>
                                            <span className="text-xs text-gray-500 font-mono">@{user.username || 'unknown'}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <Badge variant="outline" className="w-fit border-gray-700 text-gray-400 text-[10px] uppercase">
                                            {user.role}
                                        </Badge>
                                        {user.developer_role && (
                                            <span className="text-xs text-cyan-500 flex items-center gap-1">
                                                <Code className="w-3 h-3" /> {user.developer_role}
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm text-gray-400">
                                        Lvl {user.level} <span className="text-gray-600">•</span> {user.xp} XP
                                    </div>
                                </TableCell>
                                <TableCell>{renderStatus(user.status)}</TableCell>
                                <TableCell className="text-right">
                                    {user.role !== 'admin' && renderAction(user)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {users.map((user) => (
                    <Card
                        key={user.id}
                        className={`border-gray-800 bg-gray-900/50 ${user.status === 'banned' ? 'border-red-900/50 bg-red-950/10' : ''}`}
                    >
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 border border-gray-700">
                                        <AvatarImage src={user.avatar_url || ''} />
                                        <AvatarFallback>{(user.username || 'U')[0].toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-200">{user.full_name || 'No Name'}</span>
                                        <span className="text-xs text-gray-500 font-mono">@{user.username || 'unknown'}</span>
                                    </div>
                                </div>
                                {renderStatus(user.status)}
                            </div>
                        </CardHeader>
                        <CardContent className="pb-3 grid gap-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Mail className="w-4 h-4 text-gray-500" />
                                <span className="truncate">{user.email}</span>
                            </div>
                            {user.location && (
                                <div className="flex items-center gap-2 text-gray-400">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                    <span>{user.location}</span>
                                </div>
                            )}
                            <div className="flex gap-2 mt-2">
                                <Badge variant="outline" className="border-gray-700 text-gray-400">
                                    {user.role}
                                </Badge>
                                {user.developer_role && (
                                    <Badge variant="outline" className="border-cyan-900/30 text-cyan-500 bg-cyan-950/10">
                                        {user.developer_role}
                                    </Badge>
                                )}
                                <Badge variant="outline" className="border-yellow-900/30 text-yellow-500 bg-yellow-950/10">
                                    Lvl {user.level}
                                </Badge>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-3 border-t border-gray-800/50 flex justify-end">
                            {user.role !== 'admin' && renderAction(user)}
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Ban Confirmation Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="bg-gray-900 border-red-900">
                    <DialogHeader>
                        <DialogTitle className="text-red-500 flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5" />
                            Confirm User Ban
                        </DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Are you sure you want to ban <span className="font-bold text-white">@{userToBan?.username}</span>?
                            <br /><br />
                            This will immediately:
                            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                                <li>Revoke their access to the platform</li>
                                <li>Prevent any future logins</li>
                                <li>Mark their profile as BANNED appropriately</li>
                            </ul>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="ghost" onClick={() => setDialogOpen(false)} className="text-gray-400 hover:text-white">
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmBan} className="bg-red-600 hover:bg-red-700">
                            Yes, Ban User
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
