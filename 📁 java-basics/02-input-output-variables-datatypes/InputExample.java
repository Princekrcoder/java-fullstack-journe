
import java.util.*;


public class InputExample {
    public static void main(String[] args) {
        //Input from user
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter your name: ");
        String name = sc.nextLine();
        //nextInt(), nextDouble(), nextFloat()
        System.out.println("Hello, " + name);

        sc.close(); // Scanner close karna important hai
    }
}
