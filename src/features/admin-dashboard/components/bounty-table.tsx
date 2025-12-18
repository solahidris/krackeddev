import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BountyRowActions } from './bounty-row-actions';
import Link from 'next/link';
import { Plus } from 'lucide-react';

interface BountyTableProps {
    bounties: any[]; // Using any[] temporarily, should check Database type
}

export function BountyTable({ bounties }: BountyTableProps) {
    if (!bounties.length) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] border rounded-lg bg-muted/10">
                <h3 className="text-xl font-semibold mb-2">No bounties found</h3>
                <p className="text-muted-foreground mb-6">Get started by creating your first bounty.</p>
                <Button asChild>
                    <Link href="/admin/bounties/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Bounty
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <>
            {/* Mobile View: Cards */}
            <div className="md:hidden space-y-4">
                {bounties.map((bounty) => (
                    <div key={bounty.id} className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm relative">
                        <div className="absolute top-4 right-4">
                            <BountyRowActions bountyId={bounty.id} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <h4 className="font-semibold">{bounty.title}</h4>
                                <p className="text-sm text-muted-foreground">{bounty.company_name || 'No Company'}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant={
                                    bounty.status === 'open' ? 'default' :
                                        bounty.status === 'completed' ? 'secondary' :
                                            'outline'
                                }>
                                    {bounty.status}
                                </Badge>
                                <span className="text-sm text-muted-foreground capitalize">{bounty.type}</span>
                            </div>
                            <div className="mt-2 text-sm font-medium">
                                Reward: RM {bounty.reward_amount.toLocaleString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Reward</TableHead>
                            <TableHead className="w-[70px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bounties.map((bounty) => (
                            <TableRow key={bounty.id}>
                                <TableCell className="font-medium">{bounty.title}</TableCell>
                                <TableCell>{bounty.company_name || '-'}</TableCell>
                                <TableCell>{bounty.type}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        bounty.status === 'open' ? 'default' :
                                            bounty.status === 'completed' ? 'secondary' :
                                                'outline'
                                    }>
                                        {bounty.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    RM {bounty.reward_amount.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <BountyRowActions bountyId={bounty.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
