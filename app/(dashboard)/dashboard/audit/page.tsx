"use client"

import React from "react"
import { Download, SlidersHorizontal, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const MOCK_LOGS = Array.from({ length: 50 }).map((_, i) => ({
  id: `log_${9482 + i}`,
  timestamp: new Date(Date.now() - i * 3600000).toISOString().replace("T", " ").substring(0, 19),
  actor: i % 3 === 0 ? "System_AI" : "usr_29f8a",
  action: i % 4 === 0 ? "API_KEY_GEN" : i % 5 === 0 ? "AUTH_FAIL" : "REMOVAL_REQ",
  target: i % 4 === 0 ? "prod_v2" : "Acxiom_DB",
  ip: i % 3 === 0 ? "10.0.0.1 (VPC)" : "192.168.1.14"
}))

export default function AuditLogsPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] overflow-hidden px-2 lg:px-4 pb-4">

      {/* Dense Utilitarian Header */}
      <div className="flex items-center justify-between gap-2 p-2 bg-zinc-950 border border-border/50 rounded-t-sm shrink-0">
        <div className="flex items-center gap-2 w-full max-w-sm relative">
          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-zinc-500" />
          <Input placeholder="Filter logs via Regex or ID..." className="h-8 pl-8 text-xs bg-zinc-900 border-zinc-800 rounded-sm " />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" className="h-8 text-xs rounded-sm border-zinc-800">
            <SlidersHorizontal className="w-3.5 h-3.5 mr-2" /> Columns
          </Button>
          <Button size="sm" className="h-8 text-xs rounded-sm bg-primary hover:bg-primary/90 text-primary-foreground">
            <Download className="w-3.5 h-3.5 mr-2" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Raw Data Table (Structurally mimicking TanStack) */}
      <div className="flex-1 h-screen overflow-x-hidden border-x border-b border-zinc-800 bg-zinc-950 rounded-b-sm scrollbar-hide">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="sticky top-0 bg-zinc-900 text-zinc-400 border-b border-zinc-800 z-10">
            <tr>
              <th className="px-4 py-2 font-semibold">TIMESTAMP (UTC)</th>
              <th className="px-4 py-2 font-semibold">ACTOR_ID</th>
              <th className="px-4 py-2 font-semibold">ACTION_TYPE</th>
              <th className="px-4 py-2 font-semibold">TARGET_OBJ</th>
              <th className="px-4 py-2 font-semibold">SOURCE_IP</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800 text-zinc-300">
            {MOCK_LOGS.map((log) => (
              <tr key={log.id} className="hover:bg-zinc-900 transition-colors">
                <td className="px-4 py-1.5">{log.timestamp}</td>
                <td className="px-4 py-1.5">{log.actor}</td>
                <td className="px-4 py-1.5">
                  <Badge
                    variant="outline"
                    className={`text-[9px] rounded-sm px-1.5 py-0 border-transparent ${log.action === 'AUTH_FAIL'
                      ? 'bg-red-500/10 text-red-400'
                      : 'bg-emerald-500/10 text-emerald-400'
                      }`}
                  >
                    {log.action}
                  </Badge>
                </td>
                <td className="px-4 py-1.5 text-zinc-400">{log.target}</td>
                <td className="px-4 py-1.5 text-zinc-400">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-2 text-[12px] text-zinc-500 text-right  tracking-wide shrink-0">
        SHOWING 50 OF 14,204 LOGS • IMMUTABLE LEDGER ACTIVE
      </div>
    </div>
  )
}