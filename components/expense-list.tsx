"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AddExpenseDialog } from "@/components/add-expense-dialog"
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { getExpenses, logExpense, deleteExpense } from "@/utils/api"

interface Expense {
  userId: string
  timestamp: string
  amount: number
  category: string
  note?: string
}

const categoryColors: Record<string, string> = {
  "Food & Dining": "bg-orange-100 text-orange-800",
  Transportation: "bg-blue-100 text-blue-800",
  Entertainment: "bg-purple-100 text-purple-800",
  Healthcare: "bg-green-100 text-green-800",
  Shopping: "bg-pink-100 text-pink-800",
  "Bills & Utilities": "bg-yellow-100 text-yellow-800",
  Travel: "bg-cyan-100 text-cyan-800",
  Education: "bg-indigo-100 text-indigo-800",
  Other: "bg-gray-100 text-gray-800",
}

export function ExpenseList() {
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)

  const userId = "user-kushagrasinghonline@gmail.com"

  const fetchExpenses = async () => {
    setLoading(true)
    try {
      const data = await getExpenses(userId)
      setExpenses(data)
    } catch (error) {
      console.error("Error fetching expenses", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const handleAddExpense = async (
    newExpense: Omit<Expense, "timestamp" | "userId" | "note"> & { description: string }
  ) => {
    try {
      const timestamp = new Date().toISOString()
      await logExpense({
        userId,
        timestamp,
        amount: newExpense.amount,
        category: newExpense.category,
        note: newExpense.description,
      })
      await fetchExpenses()
    } catch (error) {
      console.error("Failed to add expense", error)
    }
  }

  const handleDeleteExpense = async (timestamp: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this expense?")
    if (!confirmDelete) return

    try {
      await deleteExpense(userId, timestamp)
      await fetchExpenses()
    } catch (error) {
      console.error("Failed to delete expense", error)
    }
  }

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold">Expenses</h1>
            <p className="text-muted-foreground">Manage and track all your expenses</p>
          </div>
        </div>
        <Button onClick={() => setShowAddExpense(true)} className="hidden sm:flex">
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </header>

      <div className="flex-1 p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>All Expenses</CardTitle>
            <CardDescription>View, edit, and manage your expense records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="rounded-md border">
              {loading ? (
                <div className="p-6 text-center text-muted-foreground">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Note</TableHead>
                      <TableHead className="hidden sm:table-cell">Category</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExpenses.map((expense, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{expense.note || "(No note)"}</div>
                            <div className="sm:hidden mt-1">
                              <Badge
                                variant="secondary"
                                className={`${categoryColors[expense.category] || "bg-gray-100 text-gray-800"} text-xs`}
                              >
                                {expense.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground ml-2">
                                {new Date(expense.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge
                            variant="secondary"
                            className={categoryColors[expense.category] || "bg-gray-100 text-gray-800"}
                          >
                            {expense.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {new Date(expense.timestamp).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${expense.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteExpense(expense.timestamp)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Button
        onClick={() => setShowAddExpense(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg sm:hidden"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <AddExpenseDialog
        open={showAddExpense}
        onOpenChange={setShowAddExpense}
        onAddExpense={handleAddExpense}
      />
    </div>
  )
}
